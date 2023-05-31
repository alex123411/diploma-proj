import { FC, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string;
}

const MainForm: FC<Props> = ({ className, ...props }) => {

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event)
    event.preventDefault();
  }

  return (
    <form className={className} onSubmit={handleFormSubmit}>
      <div className='mb-3'>
        <label htmlFor='input-position' className='form-label'>Desired Postion</label>
        <input type='text' className='form-control' id='input-position'></input>
      </div>
      <div className='mb-3'>
        <label htmlFor='input-company' className='form-label'>Desired Company</label>
        <input type='text' className='form-control' id='input-company'></input>
      </div>
      <button type='submit' className='btn btn-primary'> Search </button>
    </form>
  )
}

export default MainForm