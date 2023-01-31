import { f_o__casted_to_class } from "./f_o__casted_to_class.module.js"

class BadClassNameThatShouldntExist{
    constructor(BadPropNameThatShouldntExist){
        this.BadPropNameThatShouldntExist = BadPropNameThatShouldntExist;
    }
}
class O_person{
    constructor(s_name, WorseCognomen, WorseCognomina, a_o_hand){
        this.s_name = s_name
        this.WorseCognomen = WorseCognomen
        this.WorseCognomina = WorseCognomina// cognomina is the plural of cognomen
        this.a_o_hand = a_o_hand
    }
}
class O_hand{
    constructor(s_side, a_o_finger){
        this.s_side = s_side
        this.a_o_finger = a_o_finger
    }
}
class O_finger{
    constructor(s_name){
        this.s_name= s_name
    }
}

var o_person__not_an_instance = {
    s_name : "Hans", 
    WorseCognomen: {BadPropNameThatShouldntExist:"!_!"},
    WorseCognomina: [{BadPropNameThatShouldntExist:"-,-"}],
    a_o_hand: [
        {
            s_side: "left", 
            a_o_finger: [
                {
                    s_name : "index"
                }
            ]
        },
        {
            s_side: "right",
            a_o_finger: [
                {
                    s_name : "pinky"
                }
            ]
        }
    ]
}
var o_person__instance = new O_person(
    "Hans", 
    new BadClassNameThatShouldntExist("!_!"),
    [
        new BadClassNameThatShouldntExist("-,-"),
    ],
    [
        new O_hand(
            "left", 
            [ 
                new O_finger("index")
            ]
        ),
        new O_hand(
            "right", 
            [ 
                new O_finger("pinky")
            ]
        )
    ]
);


var a_o_class = [
    O_person,
    {
        s_prop_name_instance: "WorseCognomen",
        s_prop_name_instance_array: "WorseCognomina",
        o_class:BadClassNameThatShouldntExist
    },// some classes may contain a bad name not following the scheme 'o_...' and 'a_o...'
    O_hand,
    O_finger
];

var o_person__casted_to_class = f_o__casted_to_class(
    o_person__not_an_instance,
    a_o_class,
    O_person
);

console.log(o_person__not_an_instance)
console.log(o_person__casted_to_class)

console.log(o_person__not_an_instance.a_o_hand)
console.log(o_person__casted_to_class.a_o_hand)