import {List} from  'react-bootstrap-icons';
import {Search} from  'react-bootstrap-icons';


 function ChanInterface() {
    return (
      <div className="channels-interface">
        
        <div className="menu-wrapper">
          <List className='zxc'/>
         </div>

          <div className="search-input">
          <Search/>
          <input placeholder="Search" type="text" />
          </div>
        
      </div>
    );
  }

  export default ChanInterface;