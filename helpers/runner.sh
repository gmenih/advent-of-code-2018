DAY=${1:-1}
TASK=${2:-1}

DAY_PAD=$(printf %02d $DAY)

if test -e "./src/day${DAY_PAD}/task${TASK}.js";
then
    echo "Running task ${TASK} from day ${DAY}."
    node "./src/day${DAY_PAD}/task${TASK}.js"
else
    echo "This task is not solved yet." > /dev/stderr
fi
