import React, { FunctionComponent, SyntheticEvent } from "react";
import { ChoiceGroup } from "office-ui-fabric-react";

import { versions, defaultVersion } from '../util/defaults'


const VersionSelector = ({updaterAction}) => {

  updaterAction(defaultVersion)

  let dropdownOptions = [];
  for (let version of versions) {
      let option = {
          key: version,
          text: `OpenJDK ${version}`
      }
      dropdownOptions.push(option)
  }
  return (
    <div className="btn-container">
      <form id="version-selector" className="btn-form">
        <h3>Choose a Version</h3>
        <ChoiceGroup
          className="d-flex justify-content-center"
          defaultSelectedKey={defaultVersion}
          onChange={(e, selectedOption) => {updaterAction(selectedOption.key)}}
          options={dropdownOptions}
        />
      </form>
    </div>
  );
};

export default VersionSelector;
