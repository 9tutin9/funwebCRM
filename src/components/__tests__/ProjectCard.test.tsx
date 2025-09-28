import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from '../ProjectCard';

test('renders title and status and handles click', async () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <ProjectCard title="Projekt A" status="in_progress" onClick={onClick} />,
  );
  expect(getByText('Projekt A')).toBeInTheDocument();
  expect(getByText('in_progress')).toBeInTheDocument();
  await userEvent.click(getByText('Projekt A'));
  expect(onClick).toHaveBeenCalled();
});
