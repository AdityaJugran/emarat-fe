import { Space } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';
import { ColoredBox } from 'features/shared/components/styledComponents/ColoredBox';
import { useOrientation } from 'config/hooks';
import Card from 'features/shared/components/styledComponents/Card';

type PieChartComponentProps = {
	data: {
		name: string;
		value: number;
		color?: string;
	}[];
	innerContent?: string;
	title: string;
	isPayment?: boolean;
};

export default function PieChartComponent({
	data,
	innerContent,
	title,
	isPayment = false,
}: PieChartComponentProps) {
	const { isMobile } = useOrientation();
	return (
		<>
			<p className="text-3xl">{title}</p>
			<PieChart width={isMobile ? 350 : 400} height={220}>
				{innerContent && (
					<text
						x={isMobile ? 145 : 200}
						y={120}
						textAnchor="middle"
						dominantBaseline="middle"
					>
						{innerContent}
					</text>
				)}
				<Pie
					data={data}
					cx={isMobile ? 145 : 200}
					cy={110}
					innerRadius={50}
					outerRadius={70}
					paddingAngle={2}
					dataKey="value"
					nameKey="name"
					isAnimationActive={false}
					label={(entry) =>
						isMobile
							? `${(entry.percent * 100).toFixed(0)}%`
							: `${entry.name} ${(entry.percent * 100).toFixed(
									0
							  )}%`
					}
				>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} />
					))}
				</Pie>
			</PieChart>
			{!isPayment && (
				<div className="flex flex-wrap">
					{data.map((dataItem) => {
						const { name, value, color } = dataItem;
						return (
							<Space key={name} className="mx-4">
								<>
									<ColoredBox color={color} />
									<span
										style={{ color }}
									>{`${name} ${value}`}</span>
								</>
							</Space>
						);
					})}
				</div>
			)}
		</>
	);
}
