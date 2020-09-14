# Helpful docs

[How to build ios, android, and web app for development](/docs/how-to-build-ios-android-and-web.md)

[How to use shared components package between web and app](/docs/how-to-use-shared-components-web-and-app.md)

## Available Scripts

In the root directory, you can run:

### `yarn test`

Launches the test runner in the interactive watch mode.

NOTE: If the snapshots are failing, you can run `yarn test -u` to update them.

### `yarn lint`

This will output a list of all lint errors to the console. You can also run `yarn lint:fix` to automatically fix all of the prettier errors.

# ProTips

## Killing a ghost node process

Sometimes a node process will be killed in terminal, but will still be running in the background and attached to the port.
> You should ignore the '<' and '>' in the follow code snippets
Run this command to find its "PID" (process id):
`lsof -f :<insert port number here>`
Copy the PID, and then run this command to kill that process:
`kill <insert PID here>`
