



export default function updateItemById({setmessages},id, updatedItem){
  setmessages(prevItems => {
    return prevItems.map(item => {
      if (item.Id === id) {
        return { ...item, ...updatedItem };
      }
      return item;
    });
  });

};


export function removeItemById({setmessages},id){
  setmessages(prevItems => prevItems.reduce((acc, item) => {
    if (item.Id !== id) {
      acc.push(item);
    }
    return acc;
  }, []));
};



export function updateLastMessById({setchannelsList},id, updatedItem){
    console.log(updatedItem.Mess_Text);
    setchannelsList(prevItems => {
      return prevItems.map(item => {
        if (item.Id === id) {
          return { ...item, LastMessage: updatedItem.Mess_Text, LastMessageCreated: updatedItem.Created };
        }
        return item;
      });
    });
  };
 


  
export function updateChannelStatusById({setchannelsList},id, updatedItem){
    setchannelsList(prevItems => {
      return prevItems.map(item => {
        if (item.UserId === id) {
          return { ...item, UserStatus: updatedItem};
        }
        return item;
      });
    });
  };
 