import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { COLORS } from '../constants';
import styles from './Drawer.module.scss';

class Tools extends Component {
	render() {
		return (
			<div className={styles.tools}>
				<div className={styles.colorPalette}>
					{
						COLORS.map((color, index) => {
							return (
								<div 
									key={index}
									className={styles.colorItem} 
									style={{ background: color }}
									onClick={() => this.props.onSelectColor(index)}
								></div>
							);
						})
					}
				</div>
				<Button type="danger" onClick={this.props.onClear}>Очистить</Button>
			</div>
		);
	}
}

Tools.propTypes = {
	onSelectColor: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired
};

export default Tools;
