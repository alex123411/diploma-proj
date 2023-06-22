import { FC, PropsWithChildren, useEffect, useState } from 'react'
import PositionService from '../services/PositionService';
import { useFetching } from '../hooks/useFetching';
import Loading from './UI/Loading';
import PositionStatistics from './PositionStatistics';
import ContentBox from './UI/ContentBox';
import UserService, { emptyUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { formToJSON } from 'axios';
import { User } from '../models/userModel';
import { LastReq } from '../models/requestModel';
import { PositionStats } from '../models/jobStatisticsModel';

interface Props extends PropsWithChildren {
  className?: string;
}

const MainForm: FC<Props> = ({ className, ...props }) => {

  const [userData, setUserData] = useState<User>(emptyUser);
  const [lastReqsData, setLastReqsData] = useState<LastReq[]>([]);

  const [positionToSearch, setPositionToSearch] = useState('');
  const [positionToSearchProp, setPositionToSearchProp] = useState('');
  const [positionStats, setPositionStats] = useState({} as PositionStats);
  const [fetchPostitionStats, isLoading, isError] = useFetching(
    async () => {
      const response = await PositionService.getPositionStatsData(positionToSearch)
      console.log(response)
      setPositionStats(response)
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!UserService.isLoggedIn()) navigate('/auth')
    else {
      const fetchUserData = async () => {
        const user: User = await UserService.getUserData()
        setUserData(user)
        const lastReqs: LastReq[] = await UserService.getUserLastReqsData()
        setLastReqsData(lastReqs)
      }
      fetchUserData();
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (positionToSearch != '') {
      fetchPostitionStats()
        .then(async () => {
          const lastReqs: LastReq[] = await UserService.getUserLastReqsData()
          setLastReqsData(lastReqs)
        })
      setPositionToSearchProp(positionToSearch)
    }
  }

  const handleShowStat = (jsonStat: string, title: string) => {
    const stat: PositionStats = JSON.parse(jsonStat).djinniStats

    setPositionStats(stat)
    setPositionToSearchProp(title)
  }

  return (
    <div className='w-100 mt-3'>

      <div className='row m-0'>
        <ContentBox className='col-7 d-flex flex-column align-items-center'>
          <h5 className='text-align-right'>Вкажіть бажану посаду</h5>
          <form className={className + ' d-flex flex-column align-items-center mb-3'} onSubmit={handleFormSubmit} >
            <div className='mb-3 d-flex flex-column align-items-center'>

              <input
                type='text'
                className='form-control'
                id='input-position'
                value={positionToSearch}
                onChange={(e) => setPositionToSearch(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-primary'> Шукати </button>
          </form>
        </ContentBox>
        <ContentBox className='col-4 ms-auto d-flex flex-column align-items-center'>
          <h5>Попередні запити</h5>
          <div className="list-group">
            {
              lastReqsData?.map(elem =>

                <a
                  className='prev-req-itm list-group-item list-group-item-action'
                  onClick={() => handleShowStat(elem.stats, elem.query)}>{elem.query} - {elem.createdAt.split('T')[0]}
                </a>

              )
            }
          </div>

        </ContentBox>
      </div>

      {isError
        ?
        <h3>ERROR OCCURED</h3>
        :
        isLoading
          ?
          <div className='d-flex flex-column align-items-center'><Loading /></div>
          :
          <PositionStatistics userData={userData} positionToSearch={positionToSearchProp} stats={positionStats} />
      }
    </div>

  )
}

export default MainForm