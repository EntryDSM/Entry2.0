import React, {Component} from 'react';
import styles from './HorizontalProcess.css';
import classnames from 'classnames';

class Menu extends Component{
    render(){
        return (
            <div>
                <div className={styles.agenda_sets}>
                    <div className={styles.times_area}>
                        <div className={classnames(styles.current_page, styles.time)}>
                        </div>
                    </div>
                    <div className={styles.details_area}>
                        <article>
                        {this.props.title}
                        <br/>
                        {this.props.subtitle}
                        </article>
                    </div>
                </div>
            </div>
        );        
    }
}

export default Menu;