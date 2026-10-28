# GPS prototype

From the repository root in PowerShell:

```powershell
cd mobile
npm.cmd start
```

Use a compatible Expo iPhone client or iOS development build to open the project.
Windows cannot run the local iOS simulator. Native permission configuration takes
effect when a new development build is created.

For a quick browser preview, press `w` in the Expo terminal. Browser location
is not a substitute for testing GPS on your iPhone.

## Try it outdoors

1. Tap **Record start position** and allow location access while using the app.
2. Check that coordinates and reported accuracy appear.
3. Walk roughly 30-50 metres, keeping the app open.
4. Tap **Record end position** to see the straight-line distance in metres.
5. Tap **Start again** to clear the measurement.

Also test denying permission and turning off Location Services. The app should
explain how to recover. Readings can take several seconds and GPS uncertainty
affects both endpoints, so short distances may be unreliable.

This prototype stores positions in memory only. The next milestone is SQLite
persistence, followed by organising shots into holes and rounds.

## Where the code lives

- `src/app/index.tsx`: screen, permissions and GPS capture.
- `src/utils/distance.ts`: Haversine distance calculation.
- `app.json`: app name and location permission explanation.

## Checks

```powershell
npx.cmd tsc --noEmit
npm.cmd run lint
```

The `.cmd` commands avoid PowerShell script execution-policy errors.
