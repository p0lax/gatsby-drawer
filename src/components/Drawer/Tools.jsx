import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import { COLORS, MOD } from '../constants';
import styles from './Drawer.module.scss';

class Tools extends Component {
	render() {
		return (
			<div className={styles.tools}>
				<div className={styles.toolsBlock}>
					<Icon type="edit" onClick={() => { this.props.onSelectMode(MOD.FREE) }} />
					<Icon type="select" onClick={() => { this.props.onSelectMode(MOD.RECT) }} />
				</div>
				<div className={styles.toolsBlock}>
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
	onSelectMode: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired
};

export default Tools;
