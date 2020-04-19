import React from "react";
import { connect } from 'react-redux'
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";
import { createStructuredSelector } from 'reselect';
import { selectDirectory } from '../../redux/directory/directory.selectors'

const Directory = ({directory}) => (
  
      <div className="directory-menu">
        {directory.map(({ id, ...sectionProps }) => (
            <MenuItem
              key={id}
              {...sectionProps}
            />
        ))}
      </div>
    
)


const mapStateToProps = createStructuredSelector({
    directory: selectDirectory,
})

export default connect(mapStateToProps)(Directory);
