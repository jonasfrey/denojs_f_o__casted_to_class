<!-- {"s_msg":"this file was automatically generated","s_by":"generate_readme.js","s_ts_created":"Tue Feb 21 2023 13:29:44 GMT+0100 (Central European Standard Time)","n_ts_created":1676982584570} -->

# casting multidimensional objects to classes
lets say we have some classes   
```javascript 
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
```
 and then we have an json/object and we know it should be an instance of this class 
 this could be the case if we have some json, for example from a http request  
```javascript
var o_person = {
    s_name: "Hans",
    on_class_non_existing_prop: "this prop does not exist in class O_person",
    WorseCognomen: null,
    WorseCognomina: null,
    // a_o_hand: null, // this prop exists in the class O_person but does not in the object o_person, it will be initialized with null
}
```
 we can now cast that object to the class using the function 'f_o__casted_to_class'
```javascript
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
```
console.log("---")
o_person__casted_to_class is now an instance of class O_person
## multidimensional/nested objects
we can do the same with multidimensional nested objects and classes
```javascript
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
```
```javascript
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
```

```javascript
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
// {
// s_name: "Hans",
// WorseCognomen: { BadPropNameThatShouldntExist: "!_!" },
// WorseCognomina: [ { BadPropNameThatShouldntExist: "-,-" } ],
// a_o_hand: [
//     { s_side: "left", a_o_finger: [ [Object] ] },
//     { s_side: "right", a_o_finger: [ [Object] ] }
// ]
// }
console.log(o_person__casted_to_class)
// O_person {
//     s_name: "Hans",
//     WorseCognomen: BadClassNameThatShouldntExist { BadPropNameThatShouldntExist: "!_!" },
//     WorseCognomina: [ BadClassNameThatShouldntExist { BadPropNameThatShouldntExist: "-,-" } ],
//     a_o_hand: [
//     O_hand { s_side: "left", a_o_finger: [ [Object] ] },
//     O_hand { s_side: "right", a_o_finger: [ [Object] ] }
//     ]
// }
```

more tests
```javascript
class O_test_sub{
    constructor(
        s_name 
    ){
        this.s_name = s_name
    }
}
class O_test{
    constructor(
        n_id, 
        o_test_sub,
        a_o_test_sub
    ){
        this.n_id = n_id
        this.o_test_sub = o_test_sub
        this.a_o_test_sub = a_o_test_sub
    }
}
var o = f_o__casted_to_class(
    {a:'test string thsi should be object', n_id: 2, a_o_test_sub: [{},{s_name:"hans"}]},
    [O_test, O_test_sub],
    O_test
);
console.log(o)
//logs 
// O_test {
//     n_id: 2,
//     o_test_sub: O_test_sub { s_name: null },
//     a_o_test_sub: [ O_test_sub { s_name: null }, O_test_sub { s_name: "hans" } ]
//   }
```
// 