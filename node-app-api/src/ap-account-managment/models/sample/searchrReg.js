/*
    find( { name: /Neha/ } ) //For substring search, case sensitive.
    find( { name: /^yong/ } ) //start with yong
    find( { name: /Yong/i } )
    db.members.find(name: new RegExp(search)) //For substring search, case sensitive.
    db.members.find(name: new RegExp('^' + search + '$')) //For exact search, case sensitive
    db.members.find(name: new RegExp(search， ‘i')) //For substring search, case insensitive
    db.members.find(name: new RegExp('^' +search + '$', 'i')); //For exact search, case insensitive
*/
