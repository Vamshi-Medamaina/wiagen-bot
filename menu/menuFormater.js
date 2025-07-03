
function singleMeal(day,type,items){
    const emojiSet = {
    breakfast: "🍳",
    lunch: "🥗",
    snacks: "☕",
    dinner: "🍛"
  };

  const emoji=emojiSet[type];

  let res=` ${emoji} ${capitalize(type)}: \n\n`;
  res=res+items.map(item=>`-${item}`).join('\n');
  return res;
}



function formatMenu(day,menuObj){
    const emojiSet={
    breakfast:"🍳",
    lunch:"🥗",
    snacks:"☕",
    dinner:"🍛"
}
    let res=`${capitalize(day)} Menu\n\n `;
    for(const [mealType,items] of Object.entries(menuObj)){
        const emoji=emojiSet[mealType];
        res=res+`${emoji}   ${capitalize(mealType)}:\n`;
        res=res+items.map(item=>`- ${item}`).join('\n')+'\n\n';
    }
    return res.trim();

}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}




module.exports={
    singleMeal,formatMenu
}