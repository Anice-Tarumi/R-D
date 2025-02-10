import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    return {
        /**
         * Phases
         */
        phase: 'loading',

        title: () =>
        {
            set((state) =>
            {
                if(state.phase === 'loading')
                    return { phase: 'title'}

                return {}
            })
        },
        start: () =>
        {
            set((state) =>
            {
                // if(state.phase === 'transition')
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
                if(state.phase === 'menu' || state.phase === 'talking' || state.phase === 'changing' || state.phase === "map")
                    return { phase: 'playing'}

                return {}
            })
        },
        startTalking: () => {
            console.log("startTalking 実行");
            console.time("zustand set talking"); // ⏱️ 計測開始
            set((state) => {
              if (state.phase === "playing") {
                console.log("zustand の set() 実行: phase を 'talking' に変更");
                return { phase: "talking" };
              }
              return {};
            });
            console.timeEnd("zustand set talking"); // ⏱️ 計測終了
          },
          
        endTalking: () =>
        {
            console.log("endTalking 実行");
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
        },
        transition: () =>
        {
            set((state) =>
            {
                if(state.phase === 'title')
                    return { phase: 'transition' }
        
                return {}
            })
        },
        map: () =>
        {
            set((state) =>
            {
                if(state.phase === 'playing')
                    return { phase: 'map' }
        
                return {}
            })
        },
    }
}))