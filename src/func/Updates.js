



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



export function removeChanelById({setchannelsList},id){

 console.log(id);

  setchannelsList(prevItems => prevItems.reduce((acc, item) => {

    if (item.Id !== id) {
     console.log(123);
      acc.push(item);
    }
    return acc;
  }, []));
};


export function updateLastMessById({setchannelsList},id, updatedItem){
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
      
        if (item.UserId == id) {
          return { ...item, UserStatus: updatedItem};
        }
        return item;
      });
    });




  };
 

  export function updateChannelCount({setchannelsList},id){
  
   
    setchannelsList(prevItems => {
      return prevItems.map(item => {
      
        if (item.Id == id) {
          return { ...item, MessageCount : item.MessageCount++};
        }
        return item;
      });
    });


    

  };
 


  export function updateChannelCountZero({setchannelsList},id){
  
   
    setchannelsList(prevItems => {
      return prevItems.map(item => {
      
        if (item.Id == id) {
          return { ...item, MessageCount : 0};
        }
        return item;
      });
    });


    

  };
 
