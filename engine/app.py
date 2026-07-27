from pathlib import Path

from project_loader import ProjectLoader
from storyboard import Storyboard


def main():

    root = Path(__file__).resolve().parent.parent

    loader = ProjectLoader(
        root / "projects/logo-reveal/project.json"
    )

    project = loader.load()

    storyboard = Storyboard(
        root / "projects/logo-reveal/shots.json"
    )

    scenes = storyboard.load()

    print("=" * 60)
    print(project["project"]["name"])
    print("=" * 60)

    print()

    for scene in scenes:

        print(
            f"Shot {scene.shot}"
        )

        print(
            f"  Time     : {scene.start:.1f}s → {scene.end:.1f}s"
        )

        print(
            f"  Duration : {scene.duration:.1f}s"
        )

        print(
            f"  Camera   : {scene.camera}"
        )

        print(
            f"  Effect   : {scene.effect}"
        )

        print()


if __name__ == "__main__":
    main()