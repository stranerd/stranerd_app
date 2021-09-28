## Adding in Icons

1. To add an icon, [open the Figma containing our High Fidelity Design], and find the icon you want to add

2. If the icon is not available then let the Design team know, ensuring that this icon is required

3. Find your component, make a note of its exact name in Figma (see panel on the left) then right click on it and select the 'Copy as SVG' option.

4. In the source folder here, create a new file in the format `exact-name-of-component.svg` and paste the SVG markup that you copied.

5. Check if there is a fill attribute - if so, ensure that it reads 'currentColor' and not a hex value (e.g. #FFFFFF). If there is no fill attribute, that is fine as well.

6. To have the icon and its name available for the app, run `yarn prestart` in your terminal - this combines the individual SVGs into the sprite.svg file and creates an enum that makes using `IconName.name_of_icon` auto-completion friendly when imported into your components

## Removing or Replacing Icons

To remove or replace a component, first do a global search to see if the Icon is being used anywhere in the app. If it is then congratulations, it is now your responsibility to understand why that is and if the icon(s) in-app needs replacing before you can proceed.

Once you're happy with the above, simply delete (and replace) the associated file within the source folder here. When prestart is next run, the icon will no longer be in the Icon library. When in doubt about removing an icon (without replacement), err on the side of keeping an Icon in the library as this creates little overhead and prevents inadvertently breaking something.