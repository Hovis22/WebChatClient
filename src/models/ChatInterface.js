


export default function ChatInterface(){

 return(
    <div className="centre-interf">
    <div className="message-interf">

      <input placeholder="Message" type="text"/>

      <div className="icon-pad">

        <label className="custom-file-upload">
          <input type="file" />
          <i className="bi bi-paperclip"></i>
        </label>

        <label className="custom-button">
          <input type="button"/>
          <i className="bi bi-shift"></i>
        </label>

      </div>
    </div>
  </div>
 );


}