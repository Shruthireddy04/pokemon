import Image from 'next/image';
import React from 'react';
import styles from '../pokemon.module.css';

const getListDetail = async ({ params }) => {
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}/`
	);
	const list = await res.json();
	// setList(list?.results);
	const obj = {
		imgUrl: list?.sprites?.back_default,
		abilities: list?.abilities,
	};
	return obj;
};

export async function generateMetadata({ params }) {
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}/`
	);
	const list = await res.json();
	return {
		title: list.forms[0].name,
	};
}

export default async function page({ params }) {
	const list = await getListDetail({ params });
	return (
		<div className={styles.detailCnt}>
			<Image src={list?.imgUrl} width={250} height={250} alt="Pic of pokemon" />{' '}
			<div>
				<dl className={styles.desc}>
					<dt>Abilities</dt>
					{list?.abilities?.length > 0 &&
						list?.abilities?.map((ele, ind) => (
							<dd key={ind} className={styles.ability}>
								-- {ele?.ability?.name}{' '}
							</dd>
						))}
				</dl>
			</div>
		</div>
	);
}
