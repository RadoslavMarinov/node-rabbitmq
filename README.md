


## RabotMQ:

  - Start the RabitMQ service:
    ```sh
    docker-compose up -d
    ```

  - Conenct to the management panel:
    Go to [http://localhost:15672](http://localhost:15672/)

    - Enter credentials:
      
      username: `guest`
      Password: `guest`

  - Run the example
    - `cd node`
    - `npx tsx node main.ts`