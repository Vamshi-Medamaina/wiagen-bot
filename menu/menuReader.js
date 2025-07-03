const readXlsxFile = require('read-excel-file/node');




async function exceler() {
    const data = await readXlsxFile('/home/vamshi/Documents/LaughTale/Menu_Bot/data/June_mess.xlsx');


       const menu = {
    monday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    tuesday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    wednesday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    thursday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    friday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    saturday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    sunday: { breakfast: [], lunch: [], snacks: [], dinner: [] }
  };
   

  fillBreakFast(menu,data);
  fillLunch(menu,data);
  fillSnacks(menu,data);
  fillDinner(menu,data);

  return menu;



    
}

function fillBreakFast(menu,data){
    for(let row=9;row<13;row++){
        for(let col=0;col<7;col++){
            const value=data[row][col];
            if(value){
                const day=dayMap[col];
                menu[day].breakfast.push(value);
            }
        }
    }
}

function fillLunch(menu,data){
    for(let row=14;row<23;row++){
        for(let col=0;col<7;col++){
            const value=data[row][col];
            if(value){
                const day=dayMap[col];
                menu[day].lunch.push(value);
            }
        }
    }
}

function fillSnacks(menu,data){
    for(let row=24;row<26;row++){
        for(let col=0;col<7;col++){
            const value=data[row][col];
            if(value){
                const day=dayMap[col];
                menu[day].snacks.push(value);
            }
        }
    }
}

function fillDinner(menu,data){
    for(let row=27;row<34;row++){
        for(let col=0;col<7;col++){
            const value=data[row][col];
            if(value){
                const day=dayMap[col];
                menu[day].dinner.push(value);
            }
        }
    }
}


const dayMap = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
};


module.exports= {
    exceler
}