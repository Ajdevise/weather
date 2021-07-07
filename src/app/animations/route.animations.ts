import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate
} from '@angular/animations';

export const fader = trigger('routerAnimation', [
    transition('* <=> *', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], {optional: true}),
        query(':enter', [
            style({transform: 'translateX(-100%)', opacity: 0})
        ], {optional: true}),
        query(':leave', animateChild(), {optional: true}),
        group([
            query(':enter', [
                animate('600ms 300ms ease-in-out', style({
                    opacity: 1,
                    transform: 'translateX(0)'
                }))
            ], {optional: true}),
            query(':leave', [
                animate('600ms ease-in-out', style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }))
            ], {optional: true}),
            query(':enter', animateChild(), {optional: true})
       ])
    ])
])