import { f_o__casted_to_class } from "./f_o__casted_to_class.module.js"

// readme.md:startfile
// readme.md:# casting multidimensional objects to classes
// readme.md:lets say we have some classes   
// readme.md:```javascript 
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
// readme.md:```
// readme.md: and then we have an json/object and we know it should be an instance of this class 
// readme.md: this could be the case if we have some json, for example from a http request  
// readme.md:```javascript
var o_person = {
    s_name: "Hans",
    on_class_non_existing_prop: "this prop does not exist in class O_person",
    WorseCognomen: null,
    WorseCognomina: null,
    // a_o_hand: null, // this prop exists in the class O_person but does not in the object o_person, it will be initialized with null
}
// readme.md:```
// readme.md: we can now cast that object to the class using the function 'f_o__casted_to_class'
// readme.md:```javascript
var o_person__casted_to_class = f_o__casted_to_class(
    o_person,
    [
        O_person
    ], // a_o_class
    O_person
);
console.log(o_person)
// {
//     s_name: "Hans",
//     on_class_non_existing_prop: "this prop does not exist in class O_person",
//     WorseCognomen: null,
//     WorseCognomina: null
// }
console.log(o_person__casted_to_class)
// O_person { 
//     s_name: "Hans",
//     WorseCognomen: null,
//     WorseCognomina: null,
//     a_o_hand: null
// }
// readme.md:```
console.log("---")
// readme.md:o_person__casted_to_class is now an instance of class O_person
// readme.md:## multidimensional/nested objects
// readme.md:we can do the same with multidimensional nested objects and classes
// readme.md:```javascript
// this is what we got
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
// readme.md:```
// readme.md:```javascript
// this is what we want 
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
// readme.md:```

// readme.md:```javascript
var a_o_class = [
    O_person,
    {
        // some classes may contain a bad name not following the scheme 'o_...' and 'a_o...'
        // so we can define custom propety names for instances and array of instances for such cases
        s_prop_name_instance: "WorseCognomen",
        s_prop_name_instance_array: "WorseCognomina",
        o_class:BadClassNameThatShouldntExist
    },
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
// readme.md:```
// readme.md:endfile