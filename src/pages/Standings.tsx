import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGetAvailableSeasonsQuery, useGetLeagueByNameAndSeasonQuery } from '../redux/api';
import { StandingsTable } from './components/StandingsTable';

const Standings = (props:{ leagueName:string }) => {
    const { leagueName } = props;
    const { id } = useParams<{ id: string }>();
    const {
        data: league,
        error: errorLeague,
        isLoading: isLoadingLeague,
    } = useGetLeagueByNameAndSeasonQuery(`${leagueName}.1/standings?season=${id}`);
    const {
        data: seasons,
        error: errorSeasons,
        isLoading: isLoadingSeasons,
    } = useGetAvailableSeasonsQuery(`${leagueName}.1/seasons`);

    return (
        <div className="standings-page" >
            <p>{errorLeague && { errorLeague }}</p>
            <p>{errorSeasons && { errorSeasons }}</p>
            {(isLoadingLeague || isLoadingSeasons) && <div className="loading">loading...</div>}

            <h2 className="league-name" >{league && league.data.name}</h2>

            {seasons && <div className="season-names">
                {league
                    && id === String(seasons.data.seasons[seasons.data.seasons.length - 1].year)
                    && <p className="invalid-season">{`${Number(id) - 1} - ${id}`}</p>
                }
                {league
                    && id !== String(seasons.data.seasons[seasons.data.seasons.length - 1].year)
                    && <Link className="season-navigator" to={`/mackolik/${leagueName}/${Number(id) - 1}`}
                        style={{ textDecoration: 'none' }}>{`${Number(id) - 1} - ${id}`}</Link>
                }
                <h3 className="season-name">{league && `${id} - ${Number(id) + 1}`}</h3>
                {league
                    && id !== String(seasons.data.seasons[0].year)
                    && <Link className="season-navigator" to={`/mackolik/${leagueName}/${Number(id) + 1}`}
                        style={{ textDecoration: 'none' }}>{`${Number(id) + 1} - ${Number(id) + 2}`}</Link>
                }
                {league
                    && id === String(seasons.data.seasons[0].year)
                    && <p className="invalid-season">{`${Number(id) + 1} - ${Number(id) + 2}`}</p>
                }
            </div>}



            <div>{league && <StandingsTable rows={league.data.standings}/> }</div>
        </div>
    );
};

export default Standings;
