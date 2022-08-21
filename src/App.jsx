
import './Style.scss'
import {FaClipboard} from 'react-icons/fa';
import {useState, useEffect} from 'react';
import {useRef} from 'react'
import {
  numbers,
  lowerCaseLetters,
  upperCaseLetters,
  specialCharacters,
} from './Characters'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {COPY_SUCCESS, ALERT} from './Message';

toast.configure();
function App() {

  const [password, setPassword] = useState("");
  // const [copyBtnText, setCopyBtnText] = useState("COPY");
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const copyBtn = useRef();

  const handleGeneratorPassword=()=>{
    if(
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify(ALERT, true);

      return;
    }

    let characterList = "";

    if (includeLowercase) {
      characterList += lowerCaseLetters;
    }

    if (includeUppercase) {
      characterList += upperCaseLetters;
    }

    if (includeNumbers) {
      characterList += numbers;
    }

    if (includeSymbols) {
      characterList += specialCharacters;
    }

    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = getRandomIndex(characterListLength);
      password += characterList.charAt(characterIndex);
    }

    return password;
  };
  const getRandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  };

  useEffect(() => {
    handleGeneratorPassword();
  }, []);

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = (e) => {
    copyToClipboard();

    notify(COPY_SUCCESS);
  };

  return (
    <div className="container">
     <div className="generator">
      <h2>Make Your Own Password</h2>
      <div className="generator-password">

        {password}

        <button className="pswbutton" ref={copyBtn} onClick={handleCopyPassword}>
          <FaClipboard/>
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="password-length">Password Length</label>
        <input name="password-length" 
        id="password-length" 
        type="number"
        max="20"
        min="6"
        defaultValue={passwordLength}
        onChange={(e)=>setPasswordLength(e.target.value)}
        />

      </div>

      <div className="form-group">
      <label htmlFor="uppercase-letters">Include Uppercase letters</label>
        <input name="uppercase-letters" 
        className="uppercase-letters"
        id="uppercase-letters" 
        type="checkbox"
        checked={includeUppercase}
        onChange={(e)=>setIncludeUppercase(e.target.checked)}/>
      </div>

      <div className="form-group">
      <label htmlFor="lower-case">Include Lowercase Letters</label>
        <input name="lowercase-letters" 
        id="lowercase-letters"
        className="lowercase-letters" 
        type="checkbox"
        checked={includeLowercase}
        onChange={(e)=>setIncludeLowercase(e.target.checked)}

        />
      </div>

      <div className="form-group">
      <label htmlFor="include-number">Include Numbers</label>
        <input name="include-numbers" 
        className="include-numbers" 
        id="include-numbers" 
        type="checkbox"
        checked={includeNumbers}
        onChange={(e)=>setIncludeNumbers(e.target.checked)}
        />
      </div>

      <div className="form-group">
      <label htmlFor="include-symbols">Include Symbols</label>
        <input name="include-symbols" 
        className="include-symbols"
        id="include-symbols" 
        type="checkbox"
        checked={includeSymbols}
        onChange={(e)=>setIncludeSymbols(e.target.checked)}
        />
      </div>

      <button className="generator_btn" onClick={handleGeneratorPassword}>Generate New Password</button>

     </div>
    </div>
    
  );
}

export default App;
