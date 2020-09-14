redibs-web/
└── src/
    ├── app/
    │   ├── App.tsx
    │   ├── rootReducer.ts
    │   └── store.ts
    ├── features/
    │   ├── featureName/
    │   │   ├── FeatureComponent.tsx
    │   │   ├── FeatureComponent.module.scss
    │   │   ├── types.ts
    │   │   ├── interfaces.ts
    │   │   ├── enums.ts
    │   │   ├── featureSlice.ts
    │   │   ├── index.ts
    │   │   └── ...
    │   └── ...
    ├── pages/
    │   ├── RegistrationPage
    │   │   ├── __tests__/ ...
    │   │   ├── components/ ...
    │   │   │   ├── ProgressBar/ ...
    │   │   │   ├── Step1/ ...
    │   │   │   ├── Step2/ ...
    │   │   │   ├── Step3/ ...
    │   │   │   └── Step4/ ...
    │   │   ├── RegistrationPage.module.scss
    │   │   ├── RegistrationPage.tsx
    │   │   └── index.tsx (export * from './RegistrationPage')
    │   ├── Dashboard/ ...
    │   └── ...
    ├── components/
    │   ├── ComponentName/
    │   │   ├── components/
    │   │   │   ├── LocalSubComponent1/
    │   │   │   │   └── ...
    │   │   │   ├── LocalSubComponent2/
    │   │   │   │   └── ...
    │   │   │   └── ...
    │   │   ├── __tests__/
    │   │   │   ├── __snapshots__/
    │   │   │   └── index.ts
    │   │   ├── ComponentName.module.scss
    │   │   ├── ComponentName.tsx
    │   │   ├── styles.tsx (styled-components)
    │   │   └── index.tsx (export * from './ComponentName')
    │   └── index.tsx
    ├── hooks/
    │   ├── useHookName
    │   │   ├── useHookName.ts
    │   │   └── index.ts
    │   └── index.ts
    ├── context/
    │   └── ...
    ├── constants/
    │   └── ...
    ├── classes/
    │   └── Example.class.ts
    ├── enums/
    │   └── FetchMethod.enum.ts
    ├── http/
    │   └── api.service.ts
    ├── interfaces/
    │   └── Example.type.ts
    └── services/
        └── logger.service.ts
