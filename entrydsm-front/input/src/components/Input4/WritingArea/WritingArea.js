import React, {Component} from 'react';
import styles from './WritingArea.css';

class WritingArea extends Component{
    render() {
        
        return(
            <div>
                <textarea name="self_intro" className={styles.textarea_style} maxLength="1600"></textarea>
                <p className={styles.counting_area}>(0/1600)</p>
            </div>
        );
    }

    componentDidMount() {
        var siCounter = document.querySelector("textarea ~ p");
        var siTextbox = document.getElementsByClassName("textarea_style");

        siTextbox.addEventListener("input", function() {
            siCounter.textContent =  "(" + this.value.length + "/" + 1600 + ")";
        });
    }
}

export default WritingArea;

{/*<textarea id="self-introducing" class="Wfull MT10" maxlength="1600" rows="19" cols="88" placeholder="여기에 자기소개서를 입력하세요." required></textarea>
<p class="count">(0/1600)</p>*/}

// var siCounter = document.querySelector("#self-introducing ~ .count");
// var siTextbox = document.getElementById("self-introducing");

// siTextbox.addEventListener("input", function() {
//     siCounter.textContent = "(" + this.value.length + "/" + 1600 + ")";
//   });