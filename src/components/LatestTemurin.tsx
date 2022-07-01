import React, { MutableRefObject, useRef } from 'react';
import { Link, Trans } from 'gatsby-plugin-react-i18next'

import { FaArrowCircleRight, FaArchive, FaDownload } from 'react-icons/fa';

import { detectOS, UserOS } from '../util/detectOS';
import { fetchLatestForOS, useOnScreen } from '../hooks';
import { defaultVersion } from '../util/defaults'

let userOSName: string
let userOSAPIName: string
let arch: string = 'x64'

const LatestTemurin = (props): JSX.Element => {

  const userOS = detectOS();
  switch (userOS) {
    case UserOS.MAC:
      userOSName = 'macOS'
      userOSAPIName = 'mac'
      if (typeof document !== 'undefined') {
        let w = document.createElement("canvas").getContext("webgl");
        let d = w.getExtension('WEBGL_debug_renderer_info');
        let g = d && w.getParameter(d.UNMASKED_RENDERER_WEBGL) || "";
        if (g.match(/Apple/) && !g.match(/Apple GPU/)) {
          arch = 'aarch64'
        }
      }
      break;
    case UserOS.LINUX:
    case UserOS.UNIX:
      userOSName = 'Linux'
      userOSAPIName = 'linux'
      break;
    case UserOS.WIN:
      userOSName = 'Windows'
      userOSAPIName = 'windows'
      break;    
    default:
      break;
  }
  
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const binary = fetchLatestForOS(isVisible, defaultVersion, userOSAPIName, arch);

  let buttonClass = "col-6"
  let textClass = ""

  if (props.page === "home") {
    buttonClass = "col-12"
    textClass = "text-pink medium"
  }

    return (
      <div ref={ref} className={props.page === "home" ? "container hide-on-mobile" : "container"}>
        {binary ? (
          <h2 className={`fw-light mt-3 ${textClass}`}>
            <Trans i18nKey="Download Temurin for" userOSName={userOSName} arch={arch}>
              Download Temurin&trade; for {{ userOSName }} {{ arch }}
            </Trans>
          </h2>
        ) :
          <h2 className={`fw-light mt-3 ${textClass}`}>Download Temurin&trade;</h2>
        }
        <div className={`btn-group-vertical mx-auto ${buttonClass}`}>
            {binary ? (
              <>
                <Link to="/download" state={{ link: binary.link, os: userOSName, arch: arch, pkg_type: 'JDK', java_version: binary.release_name }} className="btn btn-lg btn-primary mt-3 py-3 text-white">
                    <FaDownload /> <Trans>Latest LTS Release</Trans>
                    <br/>
                    <span style={{ fontSize: '.6em'}} className="font-weight-light">{binary.release_name}</span>
                </Link>
                <Link to="/temurin/releases" className="btn btn-outline-dark mt-3">
                    <Trans>Other platforms and versions</Trans> <FaArrowCircleRight />
                </Link>
              </>
            ) :
              <Link to="/temurin/releases" className="btn btn-lg btn-primary mt-3 py-3 text-white">
                  <FaDownload /> Latest LTS releases
              </Link>
            }
            <Link to="/temurin/archive" className="btn btn-outline-dark mt-3">
                <Trans>Release Archive</Trans> <FaArchive />
            </Link>
        </div>
      </div>
    );
};

export default LatestTemurin;
