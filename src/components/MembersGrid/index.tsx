import * as React from 'react'

const MembersGrid = ({members, columns}) => {

    return (
        <div className='container'>
            <div className='row justify-content-center align-items-center'>
                {members.map(
                    (member, i): string | JSX.Element =>
                        member && (
                            // dynamically set the width of the column based on the number of columns
                            <div className={columns ? `col-lg-${12 / columns} col-md-12 mt-5` : 'col-lg-4 col-md-12 mt-5'} key={member.name}>
                                <a target='_blank' rel='noopener noreferrer' href={member.url}>
                                    <img src={`/images/${member.logo}`} style={ member.logoPadding ? { paddingRight: member.logoPadding, paddingLeft: member.logoPadding, width: '10rem'} : {width: '10rem'}} alt={`${member.name} logo`}/>
                                </a>
                            </div>
                    )
                )}
            </div>
        </div>
    );
};

export default MembersGrid;