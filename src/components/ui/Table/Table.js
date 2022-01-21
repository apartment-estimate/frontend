import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import { TableHeaderBacklog } from './TableHaederBaclog';
import TableBodyBacklog from './TableBodyBacklog';
import FilterBacklog from './FilterBacklog';
import { useMedia } from '../../../hooks/useMedia';

const useStyles = makeStyles(({ palette: { primary } }) => ({
  wrapperBacklog: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 40,
  },
  container: {

    borderRadius: '0 0 4px 4px',
    '&.MuiPaper-elevation1': {
      boxShadow: 'none',
      backgroundColor: primary.dim,
    },
    '& .MuiTableCell-root': {
      letterSpacing: 0,
    },
    '& tr td': {
      borderBottom: `1px solid ${primary.main}`,
    },
    '& tr:last-child td:first-child': {
      borderBottomLeftRadius: 4,
    },
    '& tr:last-child td:last-child': {
      borderBottomRightRadius: 4,
    },
    '& .MuiTableHead-root': {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    '& thead th:first-child': {
      borderTopLeftRadius: 4,
    },
    '& thead th:last-child': {
      borderTopRightRadius: 4,
    },
  },
}));

const TableBacklog = ({ tasks }) => {
  const { container, wrapperBacklog } = useStyles();
  const { matchesMobile } = useMedia();

  return (
    <div className={wrapperBacklog}>
      <FilterBacklog />
      <TableContainer className={container} >
        <Table>
          {!matchesMobile && <TableHeaderBacklog/>}
          <TableBodyBacklog tasks={tasks} />
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableBacklog;
