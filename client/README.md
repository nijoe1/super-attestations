## API Endpoints to 
### **Base URL**:
```
https://api.dataponte.com
```

### **Library Service API**:

1. **Get Schema by ID**:
```
Endpoint: /library/schema/:schemaUID
Method: GET
Parameters:
  - schemaUID (path parameter)
  - clientId (query parameter, default = 420)
```
```javascript
async function getSchemaById(schemaUID, clientId = 420) {
  const response = await fetch(`https://localhost:4000/library/schema/${schemaUID}?clientId=${clientId}`);
  return response.json();
}
```

2. **Get All Schema**:
```
Endpoint: /library/all-schema
Method: GET
Parameters:
  - chainId (query parameter)
```
```javascript
async function getAllSchema(chainId) {
  const response = await fetch(`https://localhost:4000/library/all-schema?chainId=${chainId}`);
  return response.json();
}
```

3. **Get Both Schema**:
```
Endpoint: /library/both-schema
Method: GET
```
```javascript
async function getBothSchema() {
  const response = await fetch(`https://localhost:4000/library/both-schema`);
  return response.json();
}
```

4. **Get Schema Attestion**:
```
Endpoint: /library/schema-attestation/:schemaUID
Method: GET
Parameters:
  - schemaUID (path parameter)
  - clientId (query parameter, default = 420)
```
```javascript
async function getSchemaAttestion(schemaUID, clientId = 420) {
  const response = await fetch(`https://localhost:4000/library/schema-attestation/${schemaUID}?clientId=${clientId}`);
  return response.json();
}
```

5. **Get Attestation by ID**:
```
Endpoint: /library/attestation/:schemaUID
Method: GET
Parameters:
  - schemaUID (path parameter)
  - clientId (query parameter, default = 420)
```
```javascript
async function getAttestationById(schemaUID, clientId = 420) {
  const response = await fetch(`https://localhost:4000/library/attestation/${schemaUID}?clientId=${clientId}`);
  return response.json();
}
```

6. **Get Attestation by Address**:
```
Endpoint: /library/attestation-by-address/:recipient
Method: GET
Parameters:
  - recipient (path parameter)
  - clientId (query parameter, default = 420)
```
```javascript
async function getAttestationByAddress(recipient, clientId = 420) {
  const response = await fetch(`https://localhost:4000/library/attestation-by-address/${recipient}?clientId=${clientId}`);
  return response.json();
}
```

7. **Get All Attestation**:
```
Endpoint: /library/all-attestation
Method: GET
Parameters:
  - recipient (query parameter)
  - chainId (query parameter)
```
\```javascript
async function getAllAttestation(recipient, chainId) {
  const response = await fetch(`https://localhost:4000/library/all-attestation?recipient=${recipient}&chainId=${chainId}`);
  return response.json();
}
\```

8. **Get Both Attestions**:
\```
Endpoint: /library/both-attestations
Method: GET
\```
\```javascript
async function getBothAttestions() {
  const response = await fetch(`https://localhost:4000/library/both-attestations`);
  return response.json();
}
\```

9. **Get Attestation**:
\```
Endpoint: /library/attestation
Method: GET
Parameters:
  - recipient (query parameter)
  - chainId (query parameter, default = 420)
\```
\```javascript
async function getAttestation(recipient, chainId = 420) {
  const response = await fetch(`https://localhost:4000/library/attestation?recipient=${recipient}&chainId=${chainId}`);
  return response.json();
}
```
