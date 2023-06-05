import { FC, PropsWithChildren, useState } from 'react'
import PositionService, { PositionStats } from '../services/PositionService';
import { useFetching } from '../hooks/useFetching';
import Loading from './UI/Loading';
import PositionStatistics from './PositionStatistics';
import ContentBox from './UI/ContentBox';

interface Props extends PropsWithChildren {
  className?: string;
}

const MainForm: FC<Props> = ({ className, ...props }) => {

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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (positionToSearch != '') {
      fetchPostitionStats()
      setPositionToSearchProp(positionToSearch)
    }
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
          <PositionStatistics positionToSearch={positionToSearchProp} stats={positionStats} />
      }
    </div>

  )
}

export default MainForm