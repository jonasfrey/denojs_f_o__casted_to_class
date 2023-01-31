var f_o__casted_to_class = function(
    o_object,
    a_o_class,
    o_class__start
){
    var o_class_instance = new o_class__start();
    for(var s_prop_name in o_class_instance){

        // if(!o_object.hasOwnProperty(s_prop_name)){
        //     var s_msg = `'${s_prop_name}': property is not set on the object / object must be instance of class ${o_class}`
        //     throw s_msg;
        // }

        var s_prop_name_class = s_prop_name;
        var value = o_object[s_prop_name];
        var s_array_prefix = "a_";
        if(s_prop_name.indexOf(s_array_prefix) == 0){
            s_prop_name_class = s_prop_name.substring(s_array_prefix.length);
        }
        var o_class = a_o_class.map(
            o=>{
                if(o.constructor.name == "Object"){
                    var o_class = o[s_prop_name_class]
                    if(o_class){
                        return o_class
                    } 
                    return false
                }
                // console.log(o.name)
                var b_match = o.name.toLowerCase() == s_prop_name_class;
                if(b_match){
                    return o
                }
                return false
            }
        ).filter(v=>v)[0];
        if(o_class){
            if(Array.isArray(value)){
                o_class_instance[s_prop_name] = []
                for(var o of value){
                    o_class_instance[s_prop_name].push(
                        f_o__casted_to_class(
                            o,
                            a_o_class,
                            o_class
                        )
                    );
                }
            }else{
                o_class_instance[s_prop_name] = 
                    f_o__casted_to_class(
                        value,
                        a_o_class,
                        o_class
                    )
            }
            continue
        }
        o_class_instance[s_prop_name] = value

    } 
    return o_class_instance
}


export {
    f_o__casted_to_class
}