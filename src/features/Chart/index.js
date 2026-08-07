import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { getEmployeQuestions, getAllAnswers, getAllReviewerRating, getAllSelfRating } from "../../apiService";

const wagonWheelPlugin = {
  id: "wagonWheelPlugin",

  afterDatasetsDraw(chart) {
    const {
      ctx,
      scales: { r },
    } = chart;

    if (!r) return;

    const labels = chart.data.labels;

    const responsibilities = labels.map((label) => {
      if (label.includes("[Core]")) return "Core";
      return "Overlapping";
    });

    const centerX = r.xCenter;
    const centerY = r.yCenter;

    const total = responsibilities.length;

    ctx.save();

    //----------------------------------
    // Draw each responsibility sector
    //----------------------------------
    const vertices = [];

    for (let i = 0; i < total; i++) {
      vertices.push(r.getPointPositionForValue(i, 10));
    }
    responsibilities.forEach((type, index) => {
      const current = vertices[index];
      const next = vertices[(index + 1) % total];

      ctx.beginPath();

      ctx.moveTo(centerX, centerY);

      ctx.lineTo(current.x, current.y);

      ctx.lineTo(next.x, next.y);

      ctx.closePath();

      ctx.fillStyle =
        type === "Core" ? "rgba(75,119,190,.45)" : "rgba(46,139,87,.55)";

      ctx.fill();
    });
    //----------------------------------
    // Outer Border
    //----------------------------------

    ctx.beginPath();

    for (let i = 0; i < total; i++) {
      const point = r.getPointPositionForValue(i, 10);

      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }

    ctx.closePath();

    ctx.lineWidth = 2;

    ctx.strokeStyle = "#2F4F4F";

    ctx.stroke();

    ctx.restore();
  },
};
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  wagonWheelPlugin,
);

function groupQuestions(data) {
  const core = [];
  const overlapping = [];

  data?.forEach((q) => {
    if (q.responsibilityName === "Core") {
      core.push(q);
    } else {
      overlapping.push(q);
    }
  });

  return {
    core,
    overlapping,
  };
}
function buildLabels(core, overlapping) {
  return [...core, ...overlapping].map(
    (item) =>
      `${item.questionCode} [${item.responsibilityName}]\n${item.criteriaLabel}`,
  );
}
export default function WagonWheel() {
  const [apiResponse, setApiResponse] = useState([]);
  const [ansResponse, setAnsResponse] = useState([]);
const [reviewers, setReviewers] = useState([]);
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "brown",
  "teal",
];

const buildReviewerData = (ratings, questions) => {
  const questionIds = questions.map((q) => q.questionId);

  const grouped = ratings.reduce((acc, item) => {
    const name = item.reviewerEmployeeName;

    if (!acc[name]) {
      acc[name] = {};
    }

    acc[name][item.questionId] = item.ratingWeightage ?? 0;

    return acc;
  }, {});

  return Object.entries(grouped).map(([name, ratingMap], index) => ({
    name,
    color: COLORS[index % COLORS.length],
    ratings: questionIds.map((id) => ratingMap[id] ?? 0),
  }));
};
useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const [
        questions,
        allAnswerList,
        allRating,
        selfRating,
      ] = await Promise.all([
        getEmployeQuestions(),
        getAllAnswers(),
        getAllReviewerRating(),
        getAllSelfRating(),
      ]);

      setApiResponse(questions);
      setAnsResponse(allAnswerList);

      // Combine reviewer + self ratings
      const reviewerData = buildReviewerData(
        [...allRating, ...selfRating],
        questions
      );

      setReviewers(reviewerData);

    } catch (error) {
      console.error(error);
    }
  };

  fetchQuestions();
}, []);
  const { core, overlapping } = useMemo(
    () => groupQuestions(apiResponse),
    [apiResponse],
  );
console.log(ansResponse,'ressssssss');

  const labels = useMemo(
    () => buildLabels(core, overlapping),
    [core, overlapping],
  );
  const datasets = reviewers.map((person) => ({
    label: person.name,
    data: person.ratings,
    borderColor: person.color,
    backgroundColor: "transparent",
    pointBackgroundColor: person.color,
    pointBorderColor: person.color,
    pointRadius: 3,
    borderWidth: 1.5,
    fill: false,
    tension: 0,
  }));
  const data = {
    labels,
    datasets,
  };
  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          display: true,
        },
        angleLines: {
          color: "#cfcfcf",
        },
        grid: {
          color: "#d9d9d9",
        },
        pointLabels: {
          font: {
            size: 10,
          },
          color: (context) => {
  const question = apiResponse[context.index];

  const answered = ansResponse?.some(
    (item) => item.questionId === question.questionId
  );

  return answered ? "green" : "#666";
},
        },
      },
    },
  };

  return (
    <div style={{ width: 900, display: 'flex', justifyContent: 'space-between' }}>
      <Radar data={data} options={options} />
      <Radar data={data} options={options} />
    </div>
  );
}
