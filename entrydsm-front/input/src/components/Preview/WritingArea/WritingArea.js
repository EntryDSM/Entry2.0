import React, {Component} from 'react';
import styles from './WritingArea.css';

class WritingArea extends Component{
    constructor(props) {
      super(props);

      this.state = {
         count: 0
     };
     this.changeCount = this.changeCount.bind(this);
   }
    
    render() {
        return(
            <div>
                <textarea name="self_intro" className={styles.textarea_style} maxLength="1600" onChange={this.changeCount}></textarea>
                <p className={styles.counting_area}>({this.state.count}/1600)</p>
            </div>
        );
    }

    changeCount(e) {
        var targetCount = e.target.value.length;
        this.setState({
            count: targetCount
        });
    }

}

export default WritingArea;
