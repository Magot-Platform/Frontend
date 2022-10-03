import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserImage from '../images/user.png';
import { updateMembership, updateUser } from '../actions/auth';
import { notify } from '../utils/notify';
import AvatarModal from '../components/section/AvatarModal';

const Setting = ({ user, updateMembership, updateUser }) => {
  let navigate = useNavigate();
  const [isModalShow, setModalShow] = useState();
  const [isEditable, setEditable] = useState(false);
  const [fullName, setFullName] = useState(user && user.name);
  const [role, setRole] = useState(user && user?.header);
  const [bio, setBio] = useState(user && user?.bio);

  const onUpdateUser = async(e) => {
    e.preventDefault();

    const res = await updateUser(fullName, role, bio);

    if (res) {
      notify('success', 'User information updated successfully');

      setEditable(false);
    }

    return;
  }

  useEffect(() => {
    const membership = new URLSearchParams(window.location.search).get(
      'membership'
    );

    if ( membership ) {
      const getData = async () => {
        const res = await updateMembership(membership);

        if (res) {
          notify('success', 'Your membership upgraded successfully');

          navigate('/setting');
        }
      }

      getData();
    }
  });

  return (
    <div className='bg-gray-100 dark:bg-slate-700 dark:text-white'>
      <div className='container mx-auto p-5'>
        <div className='md:flex no-wrap md:-mx-2 '>
          <div className='w-full md:w-3/12 md:mx-2'>
            <div className='bg-white p-3 border-t-4 border-yellow-400 dark:border-slate-900 dark:border-t-4 dark:bg-slate-800'>
              <div className='flex justify-center'>
                <button onClick={() => setModalShow(true)}>
                  <img className='rounded-full dark:grayscale-[70%]' src={user && user?.avatar ? `/img/avatars/${user.avatar}` : UserImage} width='200' alt={''} />
                </button>
              </div>
              <AvatarModal isShow={isModalShow} showModal={(v) => setModalShow(v)} />
              <h1 className='text-gray-900 font-bold text-xl leading-8 my-1 dark:text-white'>{user && user.name}</h1>
              <h3 className='text-gray-600 font-lg text-semibold leading-6 dark:text-slate-300'>{user && user?.header}</h3>
              <p className='text-sm text-gray-500 hover:text-gray-600 leading-6 dark:text-slate-300'>{user && user?.bio}</p>
              <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm dark:bg-slate-900'>
                <li className='flex items-center py-3'>
                  <span className='dark:text-slate-300'>Status</span>
                  <span className='ml-auto dark:text-slate-300'>
                    <span className='bg-yellow-500 py-1 px-2 rounded text-white text-sm'>Active</span>
                  </span>
                </li>
                <li className='flex items-center py-3'>
                  <span className='dark:text-slate-300'>Member Since</span>
                  <span className='ml-auto dark:text-slate-300'>{user && new Date(user.date).toDateString()}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full md:w-9/12 mx-2'>
            <div className='bg-white p-3 shadow-sm rounded-sm dark:bg-slate-800'>
              <div className='grid grid-cols-4'>
                {isEditable === false ?
                <button className='col-start-4 w-full block text-blue-800 text-md font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-500 p-3 my-4 shadow-xl dark:hover:bg-slate-600'
                  onClick={() => setEditable(true)}
                >Edit Information</button> :
                <div className='col-start-4 flex justify-between'>
                  <button className='w-2/5 text-blue-800 text-md font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-500 px-1 py-3 my-4 shadow-xl dark:hover:bg-slate-600'
                    onClick={() => setEditable(false)}
                  >Cancel</button>
                  <button className='w-2/5 text-blue-800 text-md font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-500 px-1 py-3 my-4 shadow-xl dark:hover:bg-slate-600'
                    onClick={(e) => onUpdateUser(e)}
                  >Save</button>
                </div>
                }
              </div>
              <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8 dark:text-white'>
                <span clas='text-green-500'>
                  <svg className='h-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </span>
                <span className='tracking-wide'>About Me</span>
              </div>
              <div className='text-gray-700 dark:text-slate-300'>
                <div className='grid md:grid-cols-2 text-md'>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Full Name :</div>
                    <div className='px-4 py-2'>{user && isEditable === false ? user.name :
                      <input className='bg-slate-200 p-1 rounded border-none dark:bg-slate-700'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />}
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Role :</div>
                    <div className='px-4 py-2'>{user && isEditable === false ? user?.header :
                      <input className='bg-slate-200 p-1 rounded border-none dark:bg-slate-700'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />}
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Email :</div>
                    <div className='px-4 py-2'>
                      <a className='text-blue-800' href='mailto:jane@example.com'>{user && user.email}</a>
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Country :</div>
                    <div className='px-4 py-2'>{user && user.country}</div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Membership Status :</div>
                    <div className='px-4 py-2'>{user && user.membership === 0 ? 'Free' : user.membership === 1 ? 'Stater' : 'Premium'}</div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Membership Expired Date :</div>
                    <div className='px-4 py-2'>{user && user?.expired && new Date(user?.expired).toDateString()}</div>
                  </div>
                </div>
                <div className='px-4 py-2 font-semibold'>Bio</div>
                <div className='px-4 py-2'>{user && isEditable === false ? user?.bio :
                  <textarea className='bg-slate-200 p-1 rounded border-none dark:bg-slate-700'
                    onChange={(e) => setBio(e.target.value)}
                    rows='5' cols='100'
                  >{bio}</textarea>}
                </div>
              </div>

            </div>

            <div className='bg-white p-3 shadow-sm rounded-sm dark:bg-slate-800'>
              <div className='grid grid-cols-1'>
                <div>
                  <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3 dark:text-white'>
                    <span clas='text-green-500'>
                      <svg className='h-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                      </svg>
                    </span>
                    <span className='tracking-wide'>History</span>
                  </div>

                  <ul className='list-inside space-y-2'>
                  { user && user?.history && user.history?.length > 0 ? user.history.map((item, index) =>
                    <li key={index}>
                      <div className='text-teal-600'>{ item.date.slice(0, 10)} {item.membership === 1 ? 'Starter' : item.membership === 2 ? 'Premium' : 'Free'}</div>
                      <div className='text-gray-500 text-xs dark:text-slate-300'>{ item.from.slice(0, 10) } - { item.to.slice(0, 10) }</div>
                    </li>) :
                    <li>
                      <div className='text-teal-600'>There is no history yet.</div>
                    </li>
                  }

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {updateMembership, updateUser})(Setting);
