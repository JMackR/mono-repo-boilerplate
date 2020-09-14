# How to use shared components package between web and app

## Summary
This doc show how to reuse components in redibs-shared package for both redibs-app and redibs-web packages; and how to create one as an example.

# Package structure
The client folder structures in 3 main packages: 

```
/redibs-app
 - Package name: redibs-app
 - Description: React native code that build android and ios apps 

/redibs-web=
- Package name: redibs-web
- Description: React JS code that build web site

/component-library 
- Package-name: redibs-shared
- Description: shared library code to use between redibs and redibs-web
```

This doc show how to reuse components in redibs-shared package for both redibs-app and redibs-web packages; and how to create one as an example.

## Prep to make sure working properly in workspace with multiple packages
In terminal:
- Run `cd ~/repos/webapp/client` to stay on root project
- Run `yarn redibs-clean` to clean up previous dependencies in packages
- Run `yarn redibs-install` to install dependencies for packages

## Use components from redibs-shared shared package for app and web
Use same import statement in redibs-app and redibs-web code
```
import { HelloWorld } from 'redibs-shared/shared/components'
```

## Create one common components in shared redibs-shared package
Let's use one example of HelloWorld component under `/component-library/shared/components/hello-world/`. Under this folder, I have 4 files:

1. hello-world.tsx : react component code for web
2. hello-world.native.tsx : react native component  code for app
3. hello-world-props.tsx : props and defautl props related code for component
4. index.ts : export component to it so the import statement does not contain file name of component like this:

```
//Instead of 

import {HelloWorld} from 'redibs-shared/shared/components/hello-world/hello-world'

// Do this
import {HelloWorld} from './shared/components/hello-world'
```

Taking advantage of this way of export, add another export statement in `/component-library/shared/components/index.ts`

So now, we can import them much cleaner w/o component folder name in the path
```
import {HelloWorld} from './shared/components/hello-world'
```














