import os
import sys
import PIL
import time
from PIL import Image


QUALITY = 90
WAIT_TIME = 3
SPLICE_LINE_HEIGHT = 500


def wait(action):
    print(action + ' will start in ' + str(WAIT_TIME) + ' seconds', end=' ')
    sys.stdout.flush()
    for i in range(WAIT_TIME):
        time.sleep(1)
        print('.', end='')
        sys.stdout.flush()
    print('\n')


def is_image(image):
    valid_ends = ('.bmp', '.dib', '.png', '.jpg', '.jpeg', '.pbm', '.pgm', '.ppm', '.tif', '.tiff')
    if not image.lower().endswith(valid_ends):
        return False
    try:
        Image.open(image)
        return True
    except PIL.UnidentifiedImageError:
        return False


def get_size(prefix, files):
    base = Image.open(prefix + '/' + files[0]).size
    for i in files:
        size = Image.open(prefix + '/' + i).size
        if base != size:
            return -1, -1
    return base


def merge_image(mask, background, result_file):
    layer1 = Image.open(background).convert('RGBA')
    layer2 = Image.open(mask).convert('RGBA')
    merge = Image.new('RGBA', layer1.size)
    merge = Image.alpha_composite(merge, layer1)
    merge = Image.alpha_composite(merge, layer2)
    merge = merge.convert('RGB')
    merge.save(result_file, quality=QUALITY)


def print_splice_example():
    print('\tfor example, if we have file tree like:')
    for i in range(1, 4):
        print('\t\tfolder' + str(i))
        for j in range(1, 6):
            print('\t\t\timage' + str(i) + '_' + str(j) + '.jpg')
    print('\tand we input \"' + ' '.join([str(i) for i in range(1, 7, 2)]) + '\", then:')
    for i in range(1, 4):
        print('\t\tfile ' + ','.join(['\"image' + str(i) + '_' + str(j) + '.jpg\"' for j in range(1, 7, 2)]))
        print('\t\t\tin directory \"folder' + str(i) + '\"')
        print('\t\t\twill splice to \"merge' + str(i) + '.jpg\" in directory \"output\"')


def join_image(files, rows, result_name):
    image_list = []
    result_width = 0
    for i in files:
        image = Image.open(i)
        width, height = image.size
        resize_width = int(width * SPLICE_LINE_HEIGHT / height)
        image = image.resize((resize_width, SPLICE_LINE_HEIGHT))
        image_list.append(image)
    cols = len(files) // rows
    for i in range(cols):
        width, height = image_list[i].size
        result_width += width
    joint = Image.new('RGB', (result_width, rows * SPLICE_LINE_HEIGHT))
    cur_width = 0
    cur_height = 0
    for i in range(len(image_list)):
        image_width, image_height = image_list[i].size
        joint.paste(image_list[i], (cur_width, cur_height))
        if (i + 1) % cols * SPLICE_LINE_HEIGHT == 0:
            cur_width = 0
            cur_height += SPLICE_LINE_HEIGHT
        else:
            cur_width += image_width
    joint.save(result_name, quality=QUALITY)
