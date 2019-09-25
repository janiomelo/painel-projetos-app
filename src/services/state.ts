import { createGlobalState } from 'react-hooks-global-state';

type Action =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'setFirstName'; firstName: string }
    | { type: 'setLastName'; lastName: string }
    | { type: 'setAge'; age: number }
    | { type: 'setTitleApp', titleApp: string };

export const { GlobalStateProvider, useGlobalState } = createGlobalState({
    counter: 0,
    titleApp: "Projetos",
    usuarioLogado: null
});