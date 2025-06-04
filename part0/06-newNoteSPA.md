```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>browser: Adds note + re-renders before sending to server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
    activate server
    server-->>browser: Status code 201 created
    
    deactivate server
```
