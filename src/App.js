import "./App.css";
import qubitlogo from "./assets/Qubit_Logo.png";
import sendimg from "./assets/send.svg";
import usericon from './assets/user-icon.png'

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={qubitlogo} alt="logo" className="logo" />
            <span className="brand">Qubit Ai</span>
          </div>
          <button className="addButton">add a new chat</button>
        </div>

        <div className="lowerSide">
          <p className="developperName">DESIGNED BY ZINE EDDINE ABDELADIM</p>
        </div>
      </div>

      <div className="main">
        <div className='chats'>
          <div className='chat'>
            <img src={usericon} className='chat-img' alt=''/><p className='txt'>lorem fvdfv srgfvd rgfq rgvsetdg dgsbtd dbgsdgb dtbsd dgbvsd dgbsdfb dbsdbf dbsdb dbsdtb dbsdbd bsdbsd bsdb sdbqd tbs dgbqd  bqd b qd b  qdbfsdghsyjsh dh bqd b </p> 
          </div>
          <div className='chat bot'>
            <img src={qubitlogo} className='chat-img' alt=''/><p className='txt'>lorem fvdfv srgfvd rgfq rgvsetdg dgsbtd dbgsdgb dtbsd dgbvsd dgbsdfb dbsdbf dbsdb dbsdtb dbsdbd bsdbsd bsdb sdbqd tbs dgbqd  bqd b qd b  qdbfsdghsyjsh dh bqd bdzef ferg eqge qegerg qegqerg eqrgqergq ergeqgqeg qegqerg qergeqerg rgrqe gegeg eqrger gqegqeg eqvdbd bdqbdq brbrdbdq bqdbqdb erbqer beqbe rdbqdfbqd bdqbdqfb qdfbdqb dth yjsyjut jtuj ykyik yuk srj qeg z GZ gr zvbsf bsfqhdthqeth q h hfsrfvzrf fqrvqd dqbdbd gbdbd bgdgbd gbdgbdwgbwdbwd bdwb wdfbdfbwd fbdwfb dfbwd fbd fbd fbwdfbwdfbwd fbdf bdg hb dwgb wd bdw bwdfbdfbdfbw ddvsd fdgqdfvbqsfvbq rsvbsfb vqbqdfbqdfbq dfb qdfdfv qsfv sqr fvbqsfvbqsgbq dfbqfbghqryjsnrygq bqdfbqdhtehqetgrsb rhbqetbqrsh qetfhbqebqeth qetbqetbn ethutjtuekyfsjnsf nefqerg dgbqdbqetdbte hryjtu keilyo l fuomuofmfuomgulflckjnvnqzriosnvoivosfnqgn uib ggh h gghizrgliuqhgi h g rg zrgzrhgzrhghrg zrhozr grhgorhgohrsoghmqosrghomqsogihoqhrgo rg og hqs </p> 
          </div>
        </div>

        <div className='chat-footer'>
          <div className='inp'>
            <input type="text" placeholder="Write a prompt to Qubit"/><button className="send"><img src={sendimg} alt='send'/></button>
          </div>
          <p>Qubit is designed to understand and respod to IT related topics, but it can produce some innaccurate informations.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
