import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
// import { tasks } from '../../../state/mockData/backlogTableHeader';
import { AvatarIcon } from '../../UI/Icons/Avatar-icon';
import { useMedia } from '../../../hooks/useMedia';

const useStyles = makeStyles(({ breakpoints, palette: { primary, icon }, typography }) => ({
  cell: {
    position: 'relative',
    padding: '3px 16px',
    minHeight: 40,
    height: 40,
    lineHeight: '16px',
    backgroundColor: primary.dim,
    borderRight: `1px solid ${primary.main}`,
    fontWeight: 300,
    color: typography.color,
    '&:last-child': {
      borderRight: 'none',
    },
    [breakpoints.down('sm')]: {
      height: '100%',
      padding: '12px 16px 5px',
    },
  },
  row: {
    [breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '50px 1fr 1fr 1fr',
      gridTemplateRows: 'auto 40px auto 40px',
      marginBottom: 20,
    },
  },
  center: {
    textAlign: 'center',
  },
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    margin: '0 auto',
    borderRadius: '50%',
    backgroundColor: '#d8e0e5',
    cursor: 'pointer',
    border: `1px solid ${icon.main}`,
  },
  cellHead: {
    position: 'absolute',
    color: icon.main,
    fontSize: 8,
    lineHeight: '8px',
    top: 3,
  },
  numberColumn: {
    [breakpoints.down('sm')]: {
      gridRowStart: 1,
      gridRowEnd: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
  },
  startupColumn: {
    [breakpoints.down('sm')]: {
      paddingTop: 18,
      gridColumnStart: 2,
      gridColumnEnd: 5,
      textAlign: 'start',
      borderRight: 'none',
      borderBottom: '1px solid red',
      borderTopRightRadius: 4,
    },
  },
  ordinalColumn: {
    [breakpoints.down('sm')]: {
      gridColumnStart: 2,
      gridColumnEnd: 3,
      gridRowStart: 2,
      gridRowEnd: 3,
      textAlign: 'start',
      // borderRight: 'none',
    },
  },
  nameColumn: {
    [breakpoints.down('sm')]: {
      gridColumnStart: 2,
      gridColumnEnd: 5,
      gridRowStart: 3,
      gridRowEnd: 4,
      textAlign: 'start',
      borderRight: 'none',
    },
  },
  statusColumn: {
    [breakpoints.down('sm')]: {
      gridColumnStart: 3,
      gridColumnEnd: 5,
      gridRowStart: 2,
      gridRowEnd: 3,
      textAlign: 'start',
      borderRight: 'none',
    },
  },
  weightColumn: {
    [breakpoints.down('sm')]: {
      gridColumnStart: 2,
      gridColumnEnd: 3,
      gridRowStart: 4,
      gridRowEnd: 5,
      textAlign: 'start',
      // borderRight: 'none',
    },
  },
  reporterColumn: {
    [breakpoints.down('sm')]: {
      gridColumnStart: 3,
      gridColumnEnd: 4,
      gridRowStart: 4,
      gridRowEnd: 5,
      textAlign: 'start',
      // borderRight: 'none',
    },
  },
  responsibleColumn: {
    [breakpoints.down('sm')]: {
      gridColumnStart: 4,
      gridColumnEnd: 5,
      gridRowStart: 4,
      gridRowEnd: 5,
      textAlign: 'start',
      borderRight: 'none',
      borderBottomRightRadius: 4,
    },
  },
}));

const TableBodyBacklog = ({ tasks }) => {
  const { row, cell, numberColumn, center, avatarWrapper, cellHead,
    startupColumn, ordinalColumn, nameColumn, statusColumn, weightColumn, reporterColumn, responsibleColumn } = useStyles();
  const { matchesMobile } = useMedia();

  const creatSerialNumber = (i) => {
    if (i < 10) return `0${i}`;
    if (i >= 10) return i;
  };

  return (
    <TableBody>
      {tasks.map((item, index) => {
        return (
          <TableRow className={row} key={item._id}>
            <TableCell className={`${cell} ${numberColumn} ${center}`}>
              {creatSerialNumber(index + 1)}
            </TableCell>
            <TableCell className={`${cell} ${startupColumn}`}>
              {matchesMobile && <div className={cellHead}>Название стартапа</div>}
              {item.nameProject}
            </TableCell>
            <TableCell className={`${cell} ${ordinalColumn}`}>
              {matchesMobile && <div className={cellHead}>Стадия задачи</div>}
              {item.ordinal}
            </TableCell>
            <TableCell className={`${cell} ${nameColumn}`}>
              {matchesMobile && <div className={cellHead}>Название задач и подзадач</div>}
              {item.name}
            </TableCell>
            <TableCell className={`${cell} ${statusColumn}`}>
              {matchesMobile && <div className={cellHead}>Статус задачи</div>}
              {item.workstatus}
            </TableCell>
            <TableCell className={`${cell} ${center} ${weightColumn}`}>
              {matchesMobile && <div className={cellHead}>Вес задачи</div>}
              {item.weight}
            </TableCell>
            <TableCell className={`${cell} ${center} ${reporterColumn}`} >
              {matchesMobile && <div className={cellHead}>Исполнитель</div>}
              <div className={avatarWrapper}>
                <AvatarIcon style={{ width: 10, fill: '#a2b6c5' }} />
              </div>
            </TableCell>
            <TableCell className={`${cell} ${center} ${responsibleColumn}`}>
              {matchesMobile && <div className={cellHead}>Ответственный</div>}
              <div className={avatarWrapper}>
                <AvatarIcon style={{ width: 10, fill: '#a2b6c5' }} />
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyBacklog;
