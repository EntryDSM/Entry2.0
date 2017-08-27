import React, {Component} from 'react';
import styles from './HorizontalProcess.css';

class CurrentMenu extends Component{
    render(){
        return (
            <div>
                <div className={styles.agenda_phase}>
                    <div className={styles.times_area}>
                        <div className={styles.time}>
                        </div>
                    </div>
                    <div className={styles.details_area}>
                        <article>
                        {this.props.title}
                        </article>
                    </div>
                </div>
            </div>
        );        
    }
}

export default CurrentMenu;