```mermaid
sequenceDiagram
    participant browser
    participant server

    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa
    Note right of browser: User submit form
    activate server
    Note right of server: Server saves the note
    server-->>browser: Status code 201 created (Only JSON response)
    Note right of browser: Javascript updates DOM
    
    deactivate server
```
