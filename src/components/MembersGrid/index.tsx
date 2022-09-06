import * as React from 'react'

const MembersGrid = (members) => {

const array = members.members

    return (
        <div className='container'>
            <div className='row justify-content-center align-items-center'>
                {array.map(
                    (member, i): string | JSX.Element =>
                        member && (
                            <div className='col-lg-4 col-md-12 mt-5' key={member.name}>
                                <a target='_blank' rel='noopener noreferrer' href={member.url}>
                                    <img src={`/images/${member.logo}`} style={{width: '10rem'}} alt={`${member.name} logo`}/>
                                </a>
                            </div>
                    )
                )}
            </div>
        </div>
    );
};

export default MembersGrid;