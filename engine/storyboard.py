import json
from dataclasses import dataclass
from pathlib import Path


@dataclass
class Scene:
    shot: int
    start: float
    end: float
    camera: str
    effect: str

    @property
    def duration(self):
        return self.end - self.start


class Storyboard:

    def __init__(self, shots_path: str):
        self.shots_path = Path(shots_path)

    def load(self):

        if not self.shots_path.exists():
            raise FileNotFoundError(self.shots_path)

        with open(self.shots_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        scenes = []

        for shot in data:

            scenes.append(
                Scene(
                    shot=shot["shot"],
                    start=shot["start"],
                    end=shot["end"],
                    camera=shot["camera"],
                    effect=shot["effect"]
                )
            )

        return scenes