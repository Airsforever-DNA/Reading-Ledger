import os
import hmac
import hashlib
import json
from datetime import datetime
from urllib.parse import urlparse, urlencode, quote
import requests

# ⚠️ 凭证一律从环境变量读取，绝不要把 AccessKey 写进代码。
# 这是公开仓库，硬编码密钥会在几分钟内被爬虫抓走。
# 运行前先在本地设置（不要提交到 git）：
#   export ALIBABA_CLOUD_ACCESS_KEY_ID="你的AccessKeyId"
#   export ALIBABA_CLOUD_ACCESS_KEY_SECRET="你的AccessKeySecret"
#   # 可选：export ALIBABA_CLOUD_WORKSPACE_ID="ws-xxxx"
try:
    access_key_id = os.environ["ALIBABA_CLOUD_ACCESS_KEY_ID"]
    access_key_secret = os.environ["ALIBABA_CLOUD_ACCESS_KEY_SECRET"]
except KeyError as missing:
    raise SystemExit(
        f"缺少环境变量 {missing}。请先设置 "
        "ALIBABA_CLOUD_ACCESS_KEY_ID 和 ALIBABA_CLOUD_ACCESS_KEY_SECRET 后再运行。"
    )
workspace_id = os.environ.get("ALIBABA_CLOUD_WORKSPACE_ID", "ws-rr2methv39ba6rkm")


def rfc3986_encode(str_value):
    return quote(str_value, safe="-._~")


def ali_sign(url, method, headers, body, access_key_id, access_key_secret):
    url_object = urlparse(url)
    canonical_uri = url_object.path if url_object.path else '/'
    query_params = {}
    if url_object.query:
        query_params = dict([part.split('=') for part in url_object.query.split('&')])
    canonical_query_string = urlencode({rfc3986_encode(k): rfc3986_encode(v) for k, v in sorted(query_params.items())})
    headers1 = {k.lower(): v for k, v in headers.items()}
    canonical_headers = ''.join(f"{k}:{v.strip()}\n" for k, v in sorted(headers1.items()) if k.startswith('x-acs-') or k in ['host', 'content-type'])
    signed_headers = ';'.join(sorted([k for k in headers1.keys() if k.startswith('x-acs-') or k in ['host', 'content-type']]))
    hashed_request_payload = hashlib.sha256(json.dumps(body).encode()).hexdigest()
    canonical_request = '\n'.join([method, canonical_uri, canonical_query_string, canonical_headers, signed_headers, hashed_request_payload])
    signature_algorithm = 'ACS3-HMAC-SHA256'
    hashed_canonical_request = hashlib.sha256(canonical_request.encode()).hexdigest()
    string_to_sign = f"{signature_algorithm}\n{hashed_canonical_request}"
    signature = hmac.new(access_key_secret.encode(), string_to_sign.encode(), hashlib.sha256).hexdigest()
    return f"{signature_algorithm} Credential={access_key_id},SignedHeaders={signed_headers},Signature={signature}"


host = 'farui.cn-beijing.aliyuncs.com'
url = f"https://{host}/{workspace_id}/farui/search/law/query"
body = {
    'appId': 'farui',
    'workspaceId': workspace_id,
    'query': '九民纪要',
    'pageParam': {'pageSize': 10, 'pageNumber': 1}
}

timestamp = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
headers = {
    'host': host,
    'Content-Type': 'application/json',
    'x-acs-action': 'RunSearchLawQuery',
    'x-acs-version': '2024-06-28',
    'x-acs-date': timestamp,
}
headers['Authorization'] = ali_sign(url, 'POST', headers, body, access_key_id, access_key_secret)

response = requests.post(url, headers=headers, data=json.dumps(body))
print(f"Status: {response.status_code}")
print(f"Response headers: {dict(response.headers)}")
print(f"Response body: {response.text}")
try:
    print(json.dumps(response.json(), ensure_ascii=False, indent=2))
except Exception as e:
    print(f"(Could not parse JSON: {e})")
