import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    return {
        /**
         * Phases
         */
        phase: 'loading',

        ready: () =>
        {
            set((state) =>
            {
                if(state.phase === 'loading')
                    return { phase: 'ready'}

                return {}
            })
        },
        start: () =>
        {
            set((state) =>
            {
                if(state.phase === 'ready')
                    return { phase: 'playing'}

                return {}
            })
        },
        menu: () =>
        {
            set((state) =>
            {
                if(state.phase === 'playing')
                    return { phase: 'menu'}

                return {}
            })
        },
        resume: () =>
        {
            set((state) =>
            {
                if(state.phase === 'menu' || state.phase === 'talking' || state.phase === 'changing')
                    return { phase: 'playing'}

                return {}
            })
        },
        startTalking: () =>
        {
            set((state) =>
            {
                if(state.phase === 'playing')
                    return { phase: 'talking'}

                return {}
            })
        },
        endTalking: () =>
        {
            set((state) =>
            {
                if(state.phase === 'talking')
                    return { phase: 'playing'}

                return {}
            })
        },
        addLoading: () =>
        {
            set((state) =>
            {
                if(state.phase === 'playing')
                    return { phase: 'addloading'}

                return {}
            })
        },
        addLoadingComp: () =>
        {
            set((state) =>
            {
                if(state.phase === 'addloading')
                    return { phase: 'playing'}

                return {}
            })
        },
        startChanging: () =>
        {
            set((state) =>
            {
                    return { phase: 'changing'}
            })
        }
    }
}))